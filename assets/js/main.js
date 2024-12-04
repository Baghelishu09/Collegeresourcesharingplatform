document.getElementById('mode').addEventListener('click', function() {
    document.body.classList.toggle('dark');
    var theme = document.body.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    document.getElementById('mode').innerHTML = theme === 'dark' ? 'Dark Mode' : 'Light Mode';
});
document.getElementById('redirect_login').addEventListener('click', function() {
    window.location.href = '/userAuth';
});
document.getElementById('menu_bar').addEventListener('click', function() {
    document.getElementById('menu').classList.toggle('show');
});
function toggleMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.style.display = (menu.style.display === 'none' || menu.style.display === '') ? 'block' : 'none';
    // shows the close icon
      document.getElementById('close-icon').style.display = (menu.style.display === 'none' || menu.style.display === '') ? 'block' : 'none';
}
  // Close mobile menu 
  function closeMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.style.display = 'none';
    document.getElementById('close_btn').style.display = 'none';
}


