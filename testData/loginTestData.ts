export interface LoginTestData {
    dataId: string;
    username: string;
    password: string;
    expectedResult: string;
}

export const loginTestData: { [key: string]: LoginTestData } = {
    Login_01: {
        dataId: "validLogin",
        username: "tomsmith",
        password: "SuperSecretPassword!",
        expectedResult: "Dashboard"
    },
    Login_02: {
        dataId: "invalidLogin",
        username: "invalid_user",
        password: "invalid_password",
        expectedResult: "Invalid credentials"
    }
};