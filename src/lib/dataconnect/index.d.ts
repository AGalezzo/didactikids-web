import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface CheckAnyUserExistsData {
  users: ({
    id: string;
  } & User_Key)[];
}

export interface CreateOrderData {
  order_insert: Order_Key;
}

export interface CreateOrderItemData {
  orderItem_insert: OrderItem_Key;
}

export interface CreateOrderItemVariables {
  orderId: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface CreateOrderVariables {
  userId: string;
  total: number;
  status: string;
  address: string;
  contact: string;
  paymentMethod: string;
}

export interface CreateProductData {
  product_insert: Product_Key;
}

export interface CreateProductVariables {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  code: string;
}

export interface CreateUserData {
  user_insert: User_Key;
}

export interface CreateUserVariables {
  id: string;
  email: string;
  role: string;
  status: string;
}

export interface DeleteProductData {
  product_delete?: Product_Key | null;
}

export interface DeleteProductVariables {
  id: string;
}

export interface GetAllOrdersData {
  orders: ({
    id: string;
    userId: string;
    total: number;
    status: string;
    createdAt: DateString;
    address: string;
    contact: string;
    paymentMethod: string;
  } & Order_Key)[];
}

export interface GetAllUsersData {
  users: ({
    id: string;
    email: string;
    role: string;
    status: string;
  } & User_Key)[];
}

export interface GetOrderItemsData {
  orderItems: ({
    id: string;
    productId: string;
    productName: string;
    quantity: number;
    price: number;
  } & OrderItem_Key)[];
}

export interface GetOrderItemsVariables {
  orderId: string;
}

export interface GetOrdersByUserData {
  orders: ({
    id: string;
    userId: string;
    total: number;
    status: string;
    createdAt: DateString;
    address: string;
    contact: string;
    paymentMethod: string;
  } & Order_Key)[];
}

export interface GetOrdersByUserVariables {
  userId: string;
}

export interface GetProductsData {
  products: ({
    id: string;
    name: string;
    description: string;
    category: string;
    price: number;
    stock: number;
    code: string;
  } & Product_Key)[];
}

export interface GetUserData {
  user?: {
    id: string;
    email: string;
    role: string;
    status: string;
  } & User_Key;
}

export interface GetUserVariables {
  id: string;
}

export interface OrderItem_Key {
  id: string;
  __typename?: 'OrderItem_Key';
}

export interface Order_Key {
  id: string;
  __typename?: 'Order_Key';
}

export interface Product_Key {
  id: string;
  __typename?: 'Product_Key';
}

export interface UpdateOrderStatusData {
  order_update?: Order_Key | null;
}

export interface UpdateOrderStatusVariables {
  id: string;
  status: string;
}

export interface UpdateUserRoleData {
  user_update?: User_Key | null;
}

export interface UpdateUserRoleVariables {
  id: string;
  role: string;
}

export interface UpdateUserStatusData {
  user_update?: User_Key | null;
}

export interface UpdateUserStatusVariables {
  id: string;
  status: string;
}

export interface User_Key {
  id: string;
  __typename?: 'User_Key';
}

interface CreateUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
  operationName: string;
}
export const createUserRef: CreateUserRef;

export function createUser(vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;
export function createUser(dc: DataConnect, vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface UpdateUserStatusRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateUserStatusVariables): MutationRef<UpdateUserStatusData, UpdateUserStatusVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateUserStatusVariables): MutationRef<UpdateUserStatusData, UpdateUserStatusVariables>;
  operationName: string;
}
export const updateUserStatusRef: UpdateUserStatusRef;

export function updateUserStatus(vars: UpdateUserStatusVariables): MutationPromise<UpdateUserStatusData, UpdateUserStatusVariables>;
export function updateUserStatus(dc: DataConnect, vars: UpdateUserStatusVariables): MutationPromise<UpdateUserStatusData, UpdateUserStatusVariables>;

interface UpdateUserRoleRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateUserRoleVariables): MutationRef<UpdateUserRoleData, UpdateUserRoleVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateUserRoleVariables): MutationRef<UpdateUserRoleData, UpdateUserRoleVariables>;
  operationName: string;
}
export const updateUserRoleRef: UpdateUserRoleRef;

export function updateUserRole(vars: UpdateUserRoleVariables): MutationPromise<UpdateUserRoleData, UpdateUserRoleVariables>;
export function updateUserRole(dc: DataConnect, vars: UpdateUserRoleVariables): MutationPromise<UpdateUserRoleData, UpdateUserRoleVariables>;

interface CreateProductRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateProductVariables): MutationRef<CreateProductData, CreateProductVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateProductVariables): MutationRef<CreateProductData, CreateProductVariables>;
  operationName: string;
}
export const createProductRef: CreateProductRef;

export function createProduct(vars: CreateProductVariables): MutationPromise<CreateProductData, CreateProductVariables>;
export function createProduct(dc: DataConnect, vars: CreateProductVariables): MutationPromise<CreateProductData, CreateProductVariables>;

interface DeleteProductRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteProductVariables): MutationRef<DeleteProductData, DeleteProductVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteProductVariables): MutationRef<DeleteProductData, DeleteProductVariables>;
  operationName: string;
}
export const deleteProductRef: DeleteProductRef;

export function deleteProduct(vars: DeleteProductVariables): MutationPromise<DeleteProductData, DeleteProductVariables>;
export function deleteProduct(dc: DataConnect, vars: DeleteProductVariables): MutationPromise<DeleteProductData, DeleteProductVariables>;

interface CreateOrderRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateOrderVariables): MutationRef<CreateOrderData, CreateOrderVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateOrderVariables): MutationRef<CreateOrderData, CreateOrderVariables>;
  operationName: string;
}
export const createOrderRef: CreateOrderRef;

export function createOrder(vars: CreateOrderVariables): MutationPromise<CreateOrderData, CreateOrderVariables>;
export function createOrder(dc: DataConnect, vars: CreateOrderVariables): MutationPromise<CreateOrderData, CreateOrderVariables>;

interface CreateOrderItemRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateOrderItemVariables): MutationRef<CreateOrderItemData, CreateOrderItemVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateOrderItemVariables): MutationRef<CreateOrderItemData, CreateOrderItemVariables>;
  operationName: string;
}
export const createOrderItemRef: CreateOrderItemRef;

export function createOrderItem(vars: CreateOrderItemVariables): MutationPromise<CreateOrderItemData, CreateOrderItemVariables>;
export function createOrderItem(dc: DataConnect, vars: CreateOrderItemVariables): MutationPromise<CreateOrderItemData, CreateOrderItemVariables>;

interface UpdateOrderStatusRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateOrderStatusVariables): MutationRef<UpdateOrderStatusData, UpdateOrderStatusVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateOrderStatusVariables): MutationRef<UpdateOrderStatusData, UpdateOrderStatusVariables>;
  operationName: string;
}
export const updateOrderStatusRef: UpdateOrderStatusRef;

export function updateOrderStatus(vars: UpdateOrderStatusVariables): MutationPromise<UpdateOrderStatusData, UpdateOrderStatusVariables>;
export function updateOrderStatus(dc: DataConnect, vars: UpdateOrderStatusVariables): MutationPromise<UpdateOrderStatusData, UpdateOrderStatusVariables>;

interface CheckAnyUserExistsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<CheckAnyUserExistsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<CheckAnyUserExistsData, undefined>;
  operationName: string;
}
export const checkAnyUserExistsRef: CheckAnyUserExistsRef;

export function checkAnyUserExists(options?: ExecuteQueryOptions): QueryPromise<CheckAnyUserExistsData, undefined>;
export function checkAnyUserExists(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<CheckAnyUserExistsData, undefined>;

interface GetUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserVariables): QueryRef<GetUserData, GetUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetUserVariables): QueryRef<GetUserData, GetUserVariables>;
  operationName: string;
}
export const getUserRef: GetUserRef;

export function getUser(vars: GetUserVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserData, GetUserVariables>;
export function getUser(dc: DataConnect, vars: GetUserVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserData, GetUserVariables>;

interface GetAllUsersRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetAllUsersData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetAllUsersData, undefined>;
  operationName: string;
}
export const getAllUsersRef: GetAllUsersRef;

export function getAllUsers(options?: ExecuteQueryOptions): QueryPromise<GetAllUsersData, undefined>;
export function getAllUsers(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetAllUsersData, undefined>;

interface GetProductsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetProductsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetProductsData, undefined>;
  operationName: string;
}
export const getProductsRef: GetProductsRef;

export function getProducts(options?: ExecuteQueryOptions): QueryPromise<GetProductsData, undefined>;
export function getProducts(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetProductsData, undefined>;

interface GetOrdersByUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetOrdersByUserVariables): QueryRef<GetOrdersByUserData, GetOrdersByUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetOrdersByUserVariables): QueryRef<GetOrdersByUserData, GetOrdersByUserVariables>;
  operationName: string;
}
export const getOrdersByUserRef: GetOrdersByUserRef;

export function getOrdersByUser(vars: GetOrdersByUserVariables, options?: ExecuteQueryOptions): QueryPromise<GetOrdersByUserData, GetOrdersByUserVariables>;
export function getOrdersByUser(dc: DataConnect, vars: GetOrdersByUserVariables, options?: ExecuteQueryOptions): QueryPromise<GetOrdersByUserData, GetOrdersByUserVariables>;

interface GetAllOrdersRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetAllOrdersData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetAllOrdersData, undefined>;
  operationName: string;
}
export const getAllOrdersRef: GetAllOrdersRef;

export function getAllOrders(options?: ExecuteQueryOptions): QueryPromise<GetAllOrdersData, undefined>;
export function getAllOrders(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetAllOrdersData, undefined>;

interface GetOrderItemsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetOrderItemsVariables): QueryRef<GetOrderItemsData, GetOrderItemsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetOrderItemsVariables): QueryRef<GetOrderItemsData, GetOrderItemsVariables>;
  operationName: string;
}
export const getOrderItemsRef: GetOrderItemsRef;

export function getOrderItems(vars: GetOrderItemsVariables, options?: ExecuteQueryOptions): QueryPromise<GetOrderItemsData, GetOrderItemsVariables>;
export function getOrderItems(dc: DataConnect, vars: GetOrderItemsVariables, options?: ExecuteQueryOptions): QueryPromise<GetOrderItemsData, GetOrderItemsVariables>;

