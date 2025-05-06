export enum AuthError {
	USER_NOT_FOUND = "USER_NOT_FOUND",
}

export default interface User {
	id?: string;
	firstName?: string;
	lastName?: string;
	email?: string;
}

export const getFullName = (user?: User): string => {
	if (!user) return "";
	return `${user.firstName} ${user.lastName}`;
}