export interface LoginTestData {
    dataId: string;
    username: string;
    password: string;
    expectedResult: string;
}

export const loginTestData: { [key: string]: LoginTestData } = {
    validLogin: {
        dataId: "validLogin",
        username: "Admin",
        password: "admin123",
        expectedResult: "Dashboard"
    },
    invalidLogin: {
        dataId: "invalidLogin",
        username: "invalid_user",
        password: "invalid_password",
        expectedResult: "Invalid credentials"
    }
};