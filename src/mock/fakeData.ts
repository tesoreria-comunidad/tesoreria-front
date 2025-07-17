import { GENDER_OPTIONS } from "@/constants/gender.constants";
import { PAYMENT_METHODS_OPTIONS } from "@/constants/payment-method.constants";
import { PAYMENT_TYPE_OPTIONS } from "@/constants/payment-type.constants";
import { ROLE_VALUES } from "@/constants/role.constants";
import {
  UserSchema,
  BalanceSchema,
  CuotaSchema,
  FamilySchema,
  PersonsSchema,
  PaymentSchema,
  RamaSchema,
} from "@/models";
import { faker } from "@faker-js/faker";

// ---------------- FAKE DATA FUNCTIONS -------------------

export const createFakeUser = () =>
  UserSchema.parse({
    id: faker.string.uuid(),
    username: faker.internet.username(),
    password: faker.internet.password(),
    role: faker.helpers.arrayElement(ROLE_VALUES),
    id_folder: faker.string.uuid(),
    id_rama: faker.string.uuid(),
    id_family: faker.string.uuid(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

export const createFakePerson = () =>
  PersonsSchema.parse({
    id: faker.string.uuid(),
    name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    address: faker.location.streetAddress(),
    phone: faker.phone.number(),
    email: faker.internet.email(),
    gender: faker.helpers.arrayElement(GENDER_OPTIONS),
    dni: faker.string.numeric(8),
    id_user: faker.string.uuid(),
    id_family: faker.string.uuid(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

export const createFakeFamily = () =>
  FamilySchema.parse({
    id: faker.string.uuid(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    name: faker.company.name(),
    phone: faker.phone.number(),
    users: Array.from({ length: 3 }, () => faker.string.uuid()),
    persons: Array.from({ length: 3 }, () => faker.string.uuid()),
    id_balance: faker.string.uuid(),
  });

export const createFakePayment = () =>
  PaymentSchema.parse({
    id: faker.string.uuid(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    payment_method: faker.helpers.arrayElement(PAYMENT_METHODS_OPTIONS),
    amount: faker.number.float({ min: 1000, max: 5000 }),
    type: faker.helpers.arrayElement(PAYMENT_TYPE_OPTIONS),
    id_family: faker.string.uuid(),
  });

export const createFakeRama = () =>
  RamaSchema.parse({
    id: faker.string.uuid(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    name: faker.commerce.department(),
    users: Array.from({ length: 5 }, () => faker.string.uuid()),
  });

export const createFakeBalance = () =>
  BalanceSchema.parse({
    id: faker.string.uuid(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    cuota_balance: faker.number.int({ min: 19000, max: 19000 }),
    cfa_balance: faker.number.int({ min: 19000 * 100, max: 19000 * 150 }),
    is_custom_cuota: faker.datatype.boolean(),
    is_custom_cfa: faker.datatype.boolean(),
    id_family: faker.string.uuid(),
    custom_balance: faker.number.int({ min: 0, max: 19000 }),
  });

export const createFakeCuota = () =>
  CuotaSchema.parse({
    id: faker.string.uuid(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    cuota_amount: 19000,
    cfa_amount: 2000000,
  });

// ---------------- EXAMPLES -------------------

export const fakeUsers = Array.from({ length: 10 }, createFakeUser);
export const fakePersons = Array.from({ length: 10 }, createFakePerson);
export const fakeCuotas = Array.from({ length: 1 }, createFakeCuota);
export const fakePayments = Array.from({ length: 10 }, createFakePayment);
export const fakeFamilies = Array.from({ length: 5 }, createFakeFamily);
export const fakeRamas = Array.from({ length: 3 }, createFakeRama);
export const fakeBalances = Array.from({ length: 5 }, createFakeBalance);
