import { FastifyTypeInstance } from "./types";
import { userSchemaCreate, userSchemaList } from "./Schema/userSchema";
import { userControllerCreate, userControllerList } from "./Controller/userController";

export async function router(app: FastifyTypeInstance){
    
    app.get('/users', { schema: userSchemaList }, userControllerList);
    app.post('/users', { schema: userSchemaCreate }, userControllerCreate)
    
}