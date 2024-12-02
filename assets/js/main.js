document.getElementById('mode').addEventListener('click', function() {
    document.body.classList.toggle('dark');
    var theme = document.body.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    document.getElementById('mode').innerHTML = theme === 'dark' ? 'Dark Mode' : 'Light Mode';
});
