import jwt from "jsonwebtoken";

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsInJvbGUiOiJhZG1pbiIsInN0YXR1cyI6IkFjdGl2ZSIsImlhdCI6MTc0MzQ4MjY3MiwiZXhwIjoxNzQzNDg2MjcyfQ.trH980kXOGGLLnr6glUO6uPIoVMvRlCz_9LC3F6cOmo"; // Reemplázalo con el token que estás probando
const decoded = jwt.decode(token);

console.log("Token decodificado:", decoded);
