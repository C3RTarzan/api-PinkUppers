"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = router;
const userSchema_1 = require("./Schema/userSchema");
const userController_1 = require("./Controller/userController");
async function router(app) {
    app.get('/users', { schema: userSchema_1.userSchemaList }, userController_1.userControllerList);
    app.post('/users', { schema: userSchema_1.userSchemaCreate }, userController_1.userControllerCreate);
}
