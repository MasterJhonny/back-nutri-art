module.exports = {
    setAvatarUrl: function setAvatarUrl (filename) {
        return `https://back-task-redirect.herokuapp.com/public/${filename}`;
    }
}