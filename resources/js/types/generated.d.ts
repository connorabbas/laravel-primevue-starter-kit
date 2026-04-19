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
emailVerifiedAt: string | string | null,
createdAt: string | string,
updatedAt: string | string,
};
}
}
