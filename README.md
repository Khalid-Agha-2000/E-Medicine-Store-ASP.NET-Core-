# E-Medicine-Store
<a href="https://emedicine-app.netlify.app/" target="_blank">E-Medicine is Azure deployed</a> full-stack e-commerce website built with ASP.NET Core, Entity Framework Core, JWT authentication, SQL Server, and RESTful APIs, featuring a React + Bootstrap frontend. <a href="https://emedicine-app.netlify.app/" target="_blank">You can check the project live here.</a>

The backend is implemented using a layered architecture with clear separation between controllers, services, and data access. Entity Framework Core is used for persistence, DTOs are applied to control data exposure, and global validation ensures consistent request handling. Authentication is managed using JWT, with role-based authorization enforcing access rules across user and admin endpoints. Swagger is integrated to document and test the API surface.

The application supports core e-commerce functionality including product browsing, cart management, order placement, and user profile updates. Administrative features include adding editing or deleting medicines, user management, and order status control, all handled through secured endpoints. Business logic is centralized in the service layer to keep controllers thin and maintainable.

The frontend is built with React and Bootstrap, focusing on clarity and usability. It includes pagination, cart and order flows, profile management, conditional rendering based on authentication and roles, and user feedback via flash messages. The UI communicates exclusively through the backend APIs, reflecting a clean client-server separation.

This project was developed as a portfolio application to demonstrate practical backend design, API security, and deployment in a real environment. It reflects an end-to-end full-stack workflow, from data modeling and authentication to frontend integration and cloud deployment.
