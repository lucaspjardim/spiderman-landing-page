document.addEventListener("DOMContentLoaded", function() {
    var loader = document.getElementById('loader');
    setTimeout(function() {
        loader.parentNode.removeChild(loader);
    }, 2500);
});
