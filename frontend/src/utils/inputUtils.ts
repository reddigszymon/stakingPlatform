export function handleNumericInput(
  event: React.KeyboardEvent<HTMLInputElement>
) {
  // Allow: backspace, delete, tab, escape, enter, home, end, arrows, digits, period, and Numpad digits
  if (
    [
      "Backspace",
      "Delete",
      "Tab",
      "Escape",
      "Enter",
      "Home",
      "End",
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "ArrowDown",
      ".",
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "Numpad0",
      "Numpad1",
      "Numpad2",
      "Numpad3",
      "Numpad4",
      "Numpad5",
      "Numpad6",
      "Numpad7",
      "Numpad8",
      "Numpad9",
    ].includes(event.key) ||
    // Allow: Ctrl+a, Ctrl+c, Ctrl+v, Ctrl+x
    (["a", "c", "v", "x"].includes(event.key.toLowerCase()) &&
      event.ctrlKey === true)
  ) {
    // let it happen, don't do anything
    return;
  }
  // Prevent the input
  event.preventDefault();
}
