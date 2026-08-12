declare namespace App {
namespace Data {
export type ErrorToastResponseData = {
status: number,
errorSummary: string,
errorDetail: string,
};
export type UserData = {
id: number,
name: string,
email: string,
isAdmin: boolean,
emailVerifiedAt: string | null,
createdAt: string,
updatedAt: string,
};
}
}
