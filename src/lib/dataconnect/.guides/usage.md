# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.





## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { createUser, updateUserStatus, updateUserRole, createProduct, deleteProduct, createOrder, createOrderItem, updateOrderStatus, deleteAllUsers, checkAnyUserExists } from '@firebasegen/default-connector';


// Operation CreateUser:  For variables, look at type CreateUserVars in ../index.d.ts
const { data } = await CreateUser(dataConnect, createUserVars);

// Operation UpdateUserStatus:  For variables, look at type UpdateUserStatusVars in ../index.d.ts
const { data } = await UpdateUserStatus(dataConnect, updateUserStatusVars);

// Operation UpdateUserRole:  For variables, look at type UpdateUserRoleVars in ../index.d.ts
const { data } = await UpdateUserRole(dataConnect, updateUserRoleVars);

// Operation CreateProduct:  For variables, look at type CreateProductVars in ../index.d.ts
const { data } = await CreateProduct(dataConnect, createProductVars);

// Operation DeleteProduct:  For variables, look at type DeleteProductVars in ../index.d.ts
const { data } = await DeleteProduct(dataConnect, deleteProductVars);

// Operation CreateOrder:  For variables, look at type CreateOrderVars in ../index.d.ts
const { data } = await CreateOrder(dataConnect, createOrderVars);

// Operation CreateOrderItem:  For variables, look at type CreateOrderItemVars in ../index.d.ts
const { data } = await CreateOrderItem(dataConnect, createOrderItemVars);

// Operation UpdateOrderStatus:  For variables, look at type UpdateOrderStatusVars in ../index.d.ts
const { data } = await UpdateOrderStatus(dataConnect, updateOrderStatusVars);

// Operation DeleteAllUsers: 
const { data } = await DeleteAllUsers(dataConnect);

// Operation CheckAnyUserExists: 
const { data } = await CheckAnyUserExists(dataConnect);


```