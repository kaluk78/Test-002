// File: test_file_4.ts

import axios from 'axios';
import { User, Product, Order } from './types';
import { v4 as uuidv4 } from 'uuid';

const BASE_URL = 'https://api.placeholder.com'; // PLACEHOLDER_URL

// MOCK USERS
export const mockUsers: User[] = [
  { id: 'user_ab85nder', name: 'User 0', email: 'user0@example.com' },
  { id: 'user_u9w956b2', name: 'User 1', email: 'user1@example.com' },
  { id: 'user_5h2yo8l4', name: 'User 2', email: 'user2@example.com' },
  { id: 'user_4ab6dpkp', name: 'User 3', email: 'user3@example.com' },
  { id: 'user_48mq3543', name: 'User 4', email: 'user4@example.com' }
];

// MOCK PRODUCTS
export const mockProducts: Product[] = [
  { id: 'prod_tdihac', name: 'Product 0', price: 420 },
  { id: 'prod_on1jrc', name: 'Product 1', price: 316 },
  { id: 'prod_cvahmu', name: 'Product 2', price: 425 },
  { id: 'prod_7wk4y6', name: 'Product 3', price: 250 },
  { id: 'prod_lia7gg', name: 'Product 4', price: 52 }
];

// MOCK ORDERS
export const mockOrders: Order[] = [
  { id: 'order_0xercof', userId: 'user_pmxeoa8k', productIds: ['prod_gvgya2', 'prod_knz3vg'] },
  { id: 'order_bik1cq1', userId: 'user_zgalttd3', productIds: ['prod_uu444t', 'prod_xk2jen'] },
  { id: 'order_kq0dwf2', userId: 'user_lxbnsl3a', productIds: ['prod_abghir', 'prod_19wycc'] },
  { id: 'order_h6fit08', userId: 'user_t8ljhw7b', productIds: ['prod_mvxpb9', 'prod_var1df'] },
  { id: 'order_atqld4l', userId: 'user_ecud3sob', productIds: ['prod_awjuui', 'prod_enc9rp'] }
];

export async function fetchUserData(userId: string): Promise<User | null> {
  try {
    const response = await axios.get(`${BASE_URL}/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
}

export function calculateOrderTotal(orderId: string): number {
  const order = mockOrders.find(o => o.id === orderId);
  if (!order) return 0;

  const total = order.productIds.reduce((sum, pid) => {
    const product = mockProducts.find(p => p.id === pid);
    return sum + (product ? product.price : 0);
  }, 0);

  return total;
}

// PLACEHOLDER - need to implement payment gateway integration
export function processPayment(orderId: string): boolean {
  console.log("Processing payment for order", orderId);
  return true;
}

// PLACEHOLDER FUNCTION - to be replaced with actual shipping logic
export function initiateShipping(orderId: string): void {
  console.log("Shipping initiated for", orderId);
}

// PLACEHOLDER VARIABLE
const TODO_REPLACE_THIS = 'some-placeholder-value';

// Debugging purposes
console.log("App initialized with BASE_URL:", BASE_URL);

// Comment line 1
// Comment line 2
// Comment line 3
// Comment line 4
// Comment line 5
// Comment line 6
// Comment line 7
// Comment line 8
// Comment line 9
// Comment line 10
// Comment line 11
// Comment line 12
// Comment line 13
// Comment line 14
// Comment line 15
// Comment line 16
// Comment line 17
// Comment line 18
// Comment line 19
// Comment line 20
// Comment line 21
// Comment line 22
// Comment line 23
// Comment line 24
// Comment line 25
// Comment line 26
// Comment line 27
// Comment line 28
// Comment line 29
// Comment line 30
// Comment line 31
// Comment line 32
// Comment line 33
// Comment line 34
// Comment line 35
// Comment line 36
// Comment line 37
// Comment line 38
// Comment line 39
// Comment line 40
// Comment line 41
// Comment line 42
// Comment line 43
// Comment line 44
// Comment line 45
// Comment line 46
// Comment line 47
// Comment line 48
// Comment line 49
// Comment line 50
// Comment line 51
// Comment line 52
// Comment line 53
// Comment line 54
// Comment line 55
// Comment line 56
// Comment line 57
// Comment line 58
// Comment line 59
// Comment line 60
// Comment line 61
// Comment line 62
// Comment line 63
// Comment line 64
// Comment line 65
// Comment line 66
// Comment line 67
// Comment line 68
// Comment line 69
// Comment line 70
// Comment line 71
// Comment line 72
// Comment line 73
// Comment line 74
// Comment line 75
// Comment line 76
// Comment line 77
// Comment line 78
// Comment line 79
// Comment line 80
// Comment line 81
// Comment line 82
// Comment line 83
// Comment line 84
// Comment line 85
// Comment line 86
// Comment line 87
// Comment line 88
// Comment line 89
// Comment line 90
// Comment line 91
// Comment line 92
// Comment line 93
// Comment line 94
// Comment line 95
// Comment line 96
// Comment line 97
// Comment line 98
// Comment line 99
// Comment line 100
// Comment line 101
// Comment line 102
// Comment line 103
// Comment line 104
// Comment line 105
// Comment line 106
// Comment line 107
// Comment line 108
// Comment line 109
// Comment line 110
// Comment line 111
// Comment line 112
// Comment line 113
// Comment line 114
// Comment line 115
// Comment line 116
// Comment line 117
// Comment line 118
// Comment line 119
// Comment line 120
// Comment line 121
// Comment line 122
// Comment line 123
// Comment line 124
// Comment line 125
// Comment line 126
// Comment line 127
// Comment line 128
// Comment line 129
// Comment line 130
// Comment line 131
// Comment line 132
// Comment line 133
// Comment line 134
// Comment line 135
// Comment line 136
// Comment line 137
// Comment line 138
// Comment line 139
// Comment line 140
// Comment line 141
// Comment line 142
// Comment line 143
// Comment line 144
// Comment line 145
// Comment line 146
// Comment line 147
// Comment line 148
// Comment line 149
// Comment line 150
// Comment line 151
// Comment line 152
// Comment line 153
// Comment line 154
// Comment line 155
// Comment line 156
// Comment line 157
// Comment line 158
// Comment line 159
// Comment line 160
// Comment line 161
// Comment line 162
// Comment line 163
// Comment line 164
// Comment line 165
// Comment line 166
// Comment line 167
// Comment line 168
// Comment line 169
// Comment line 170
// Comment line 171
// Comment line 172
// Comment line 173
// Comment line 174
// Comment line 175
// Comment line 176