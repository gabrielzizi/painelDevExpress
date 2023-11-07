import defaultUser from '../utils/default-user';
import api from '../service/apiIntegration'

interface User {
  id: string;
	name: string;
	email: string;
	createAt: string
	token: string;
}

export async function signIn(email: string, password: string) {
  let isOk = true;
  let message = '';
  try {
    // Send request
    const user = await api.signIn(email, password).catch((err) => { throw err; });

    if (user?.data?.err) {
      isOk = false;
      message = user.data.err;

      return {
        isOk: isOk,
        message: message
      };
    }

    const userData: User = user;

    console.log(userData);

    localStorage.setItem('token', userData.token);
    localStorage.setItem('email', userData.email);

    return {
      isOk: isOk,
      data: { email: userData.email, avatarUrl: 'data:image/jpeg;base64,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' }
    };
  }
  catch(err) {
    isOk = false;
    // console.log(err);
    return {
      isOk: isOk,
      message: message
    };
  }
}

export async function getUser() {
  try {
    const user = await api.getUser()
    // Send request

    return {
      isOk: true,
      data: { email: user.data.email, avatarUrl: 'data:image/jpeg;base64,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' }
    };
  }
  catch {
    return {
      isOk: false
    };
  }
}

export async function createAccount(email: string, password: string, name: string) {
  let isOk = true;
  let message = '';
  try {
    // Send request
    const user = await api.createAccount(email, password, name).catch((err) => { throw err; });


    if (user?.data?.err) {
      isOk = false;
      message = user.data.err;

      return {
        isOk: isOk,
        message: message
      };
    }

    const userData = user;

    localStorage.setItem('token', userData.token);
    localStorage.setItem('email', userData.email);


    return {
      isOk: isOk,
      data: defaultUser
    };
  }
  catch(err) {
    isOk = false;
    console.log(err);
    return {
      isOk: isOk,
      message: message
    };
  }
}

export async function changePassword(email: string, recoveryCode?: string) {
  try {
    // Send request
    console.log(email, recoveryCode);

    return {
      isOk: true
    };
  }
  catch {
    return {
      isOk: false,
      message: "Failed to change password"
    }
  }
}

export async function resetPassword(email: string) {
  let isOk = true;

  try {
    // Send request
    console.log(email);

    const res = await api.sendEmail(email, 'forgot')

    if (res?.data?.err) {
      isOk = false;

      return {
        isOk: isOk,
        message: "Failed to reset password"
      };
    }

    return {
      isOk: true
    };
  }
  catch {
    return {
      isOk: false,
      message: "Failed to reset password"
    };
  }
}
