export function capitalizeFirstLetter(string: string) {
  const first_word = string.charAt(0).toUpperCase();
  const last_word = string.slice(1)?.split("-")?.join(" ");

  const new_word = `${first_word}${last_word}`;
  const split_word = new_word.split(" ");

  for (let i = 0; i < split_word.length; i += 1) {
    split_word[i] =
      split_word[i].charAt(0).toUpperCase() + split_word[i].slice(1);
  }

  const result = split_word.join(" ");

  return result;
}
