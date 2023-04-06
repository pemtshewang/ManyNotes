# ManyNotes

| Multi Note Taking App

### Features

- User Registration

- Synchronization with notes daily
- created with love

### Tools Used

1. Express Js
2. React JS
3. SQLite
4. Prisma
5. Tailwindcss

*Note*
Send Me PR , I will accept all of your contributions

- [X] - Create signout  function with prompt feature
- [x] - Create the navbar height to be fixed  according to the logo h and not the height of the dialog content
- [ ] - add create notes where users can create notes endpoint
Given a binary tree and an integer k, write a function to find if there exists a root-to-leaf path in the tree such that the sum of node values in the path is equal to k.

Here's an example input:

yaml
Copy code
tree = {
    5: [4, 8],
    4: [11],
    8: [13, 4],
    11: [7, 2],
    13: [],
    4: [5, 1],
    7: [],
    2: [],
    5: [],
    1: []
}
k = 22
And the expected output is True, since there exists a root-to-leaf path 5 -> 4 -> 11 -> 7 that has a sum of 22.

You can solve this problem using depth-first search on the binary tree, by recursively traversing the tree and keeping track of the current path sum. If you reach a leaf node and the current path sum is equal to k, then you've found a valid path and you can return True. If you reach a leaf node and the current path sum is not equal to k, then you need to backtrack and try a different path.
