// Generate an ID
let currentId = 0;
export function nextId() {
  return (currentId += 1).toString();
}
