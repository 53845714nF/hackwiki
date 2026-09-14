// Dark Mode Toggle Script
document.addEventListener('DOMContentLoaded', function () {
  var toggleBtn = document.querySelector('.dark-mode-toggle');
  if (!toggleBtn) return;

  toggleBtn.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    document.documentElement.classList.toggle('dark-mode');

    if (document.documentElement.classList.contains('dark-mode')) {
      localStorage.setItem('hackwiki-theme', 'dark');
    } else {
      localStorage.setItem('hackwiki-theme', 'light');
    }
  });
});