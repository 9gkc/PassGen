const lengthInput = document.querySelector("#length");
const generateButton = document.querySelector("#generate");
const copyButton = document.querySelector("#copy-password");
const passwordElement = document.querySelector("#password");
const numbersCheckbox = document.querySelector("#include-numbers");
const specialCheckbox = document.querySelector("#include-special");
const historyCheckbox = document.querySelector("#save-history");
const savedPasswordsElement = document.querySelector("#saved-passwords");
const statusElement = document.querySelector(".status");
const storageKey = "passgen.history.v1";
const maxHistory = 10;

function setStatus(message, tone = "info") {
  if (!statusElement) return;
  statusElement.textContent = message;
  statusElement.dataset.tone = tone;
}

function secureRandomInt(maximum) {
  if (!Number.isInteger(maximum) || maximum <= 0) throw new Error("Invalid random range.");
  const cryptoSource = globalThis.crypto;
  if (!cryptoSource?.getRandomValues) throw new Error("Secure randomness is unavailable.");
  const limit = Math.floor(0x1_0000_0000 / maximum) * maximum;
  const buffer = new Uint32Array(1);
  do {
    cryptoSource.getRandomValues(buffer);
  } while (buffer[0] >= limit);
  return buffer[0] % maximum;
}

function secureChoice(characters) {
  return characters[secureRandomInt(characters.length)];
}

function shuffle(characters) {
  for (let index = characters.length - 1; index > 0; index -= 1) {
    const swapIndex = secureRandomInt(index + 1);
    [characters[index], characters[swapIndex]] = [characters[swapIndex], characters[index]];
  }
  return characters;
}

function generatePassword(length, includeNumbers, includeSpecial) {
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const special = "!@#$%^&*()_+-=[]{}|;:',.<>?";
  const groups = [lowercase, uppercase];
  if (includeNumbers) groups.push(numbers);
  if (includeSpecial) groups.push(special);

  const characters = groups.map((group) => secureChoice(group));
  const pool = groups.join("");
  while (characters.length < length) characters.push(secureChoice(pool));
  return shuffle(characters).join("");
}

function readHistory() {
  try {
    const stored = JSON.parse(localStorage.getItem(storageKey) || "[]");
    return Array.isArray(stored) && stored.every((value) => typeof value === "string")
      ? stored.slice(0, maxHistory)
      : [];
  } catch (error) {
    console.error("Unable to read password history", error);
    return [];
  }
}

function renderHistory() {
  if (!savedPasswordsElement) return;
  savedPasswordsElement.replaceChildren();
  if (!historyCheckbox?.checked) {
    savedPasswordsElement.textContent = "History is disabled by default for your safety.";
    return;
  }

  const history = readHistory();
  if (history.length === 0) {
    savedPasswordsElement.textContent = "No passwords saved locally.";
    return;
  }

  history.forEach((password, index) => {
    const row = document.createElement("div");
    row.className = "saved-password";
    const label = document.createElement("span");
    label.textContent = `${index + 1}.`;
    const value = document.createElement("code");
    value.textContent = password;
    row.append(label, value);
    savedPasswordsElement.appendChild(row);
  });
}

function savePassword(password) {
  if (!historyCheckbox?.checked) return;
  try {
    const history = [password, ...readHistory()].slice(0, maxHistory);
    localStorage.setItem(storageKey, JSON.stringify(history));
  } catch (error) {
    setStatus("The password was generated, but local history could not be saved.", "error");
    console.error("Unable to save password history", error);
  }
}

async function copyPassword() {
  const password = passwordElement?.textContent || "";
  if (!password || password === "Password will appear here") return;
  try {
    await navigator.clipboard.writeText(password);
    setStatus("Password copied to the clipboard.", "success");
  } catch (error) {
    setStatus("Copying was blocked. Select the password and copy it manually.", "error");
    console.error("Unable to copy password", error);
  }
}

function generate() {
  const length = Number.parseInt(lengthInput?.value || "", 10);
  if (!Number.isInteger(length) || length < 8 || length > 64) {
    setStatus("Choose a password length between 8 and 64 characters.", "error");
    lengthInput?.focus();
    return;
  }

  try {
    const password = generatePassword(length, Boolean(numbersCheckbox?.checked), Boolean(specialCheckbox?.checked));
    passwordElement.textContent = password;
    copyButton.disabled = false;
    savePassword(password);
    renderHistory();
    setStatus("A strong password was generated. Copy it and do not share it.", "success");
  } catch (error) {
    setStatus("Secure password generation is unavailable in this browser.", "error");
    console.error("Unable to generate password", error);
  }
}

lengthInput?.addEventListener("input", () => {
  const numericValue = lengthInput.value.replace(/\D/g, "");
  lengthInput.value = numericValue ? String(Math.min(64, Math.max(8, Number(numericValue)))) : "";
});
lengthInput?.addEventListener("blur", () => {
  if (!lengthInput.value) lengthInput.value = "16";
});
generateButton?.addEventListener("click", generate);
copyButton?.addEventListener("click", copyPassword);
historyCheckbox?.addEventListener("change", () => {
  if (!historyCheckbox.checked) {
    try {
      localStorage.removeItem(storageKey);
    } catch (error) {
      console.error("Unable to clear password history", error);
    }
  }
  renderHistory();
});
renderHistory();
