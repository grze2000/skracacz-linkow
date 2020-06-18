export default interface LinkSchema {
    _id: { $oid: string };
    url: string;
    code: String;
};