"Welcome to my page, shawty <3"
  .split("")
  .forEach((c, i) =>
    setTimeout(
      () => (document.getElementById("text").textContent += c),
      i * 100,
    ),
  );
