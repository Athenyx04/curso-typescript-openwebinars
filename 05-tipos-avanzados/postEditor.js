var admin = {
    name: 'Jhon',
    lastName: 'Smith',
    role: [1, 'Admin']
};
var developer = {
    name: 'Jose',
    lastName: 'Cabrera',
    role: [2, 'Developer']
};
var editor = {
    name: 'Will',
    lastName: 'Doe',
    role: [3, 'Editor']
};
var POSTS = [
    {
        id: 1,
        title: 'Aprender TypeScript',
        createdAt: '03/03/2020',
        author: developer
    },
    {
        id: 2,
        title: 'Aprender JavaScript',
        createdAt: '18/03/2020',
        author: editor
    },
    {
        id: 3,
        title: 'Es realmente TypeScript útil?',
        createdAt: '18/05/2020',
        author: admin
    },
];
var postLog = {};
function isAdmin(person) {
    var _a = person.role, role = _a[0], roleName = _a[1];
    return role === 1 && roleName === 'Admin';
}
function notHasPermissionLog(_a, _b) {
    var name = _a.name, role = _a.role;
    var title = _b.title;
    console.log("User ".concat(name, " with the role ").concat(role[1], " has no permission to edit the post ").concat(title));
}
for (var index = 0; index < POSTS.length; index++) {
    var post = POSTS[index];
    if (isAdmin(post.author)) {
        if (!(post.id in postLog)) {
            var copyPost = JSON.parse(JSON.stringify(post));
            copyPost.title = '¿Es realmente TypeScript útil?';
            copyPost.author = admin;
            var editedPost = {
                oldPost: post,
                editedBy: admin,
                editedAt: Date.now(),
                newPost: copyPost
            };
            postLog[post.id] = editedPost;
        }
    }
    else {
        notHasPermissionLog(post.author, post);
    }
}
console.log(postLog);
