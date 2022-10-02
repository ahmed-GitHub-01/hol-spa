export interface PaginationPay {
    currentPage?: number;
    itemsPerPage?: number;
    totalItems?: number;
    totalPages?: number;
}
export class PaginatedResultPay<T> {
    result?: T;
    pagination?: PaginationPay;
}
export interface PaginationStatment {
    currentPage?: number;
    itemsPerPage?: number;
    totalItems?: number;
    totalPages?: number;
}
export class PaginatedResultStatment<T> {
    result?: T;
    pagination?: PaginationStatment;
}
export interface PaginationNumber {
    currentPage?: number;
    itemsPerPage?: number;
    totalItems?: number;
    totalPages?: number;
}
export class PaginatedResultNumber<T> {
    result?: T;
    pagination?: PaginationNumber;
}
export interface PaginationOldStatment {
    currentPage?: number;
    itemsPerPage?: number;
    totalItems?: number;
    totalPages?: number;
}
export class PaginatedResultOldStatment<T> {
    result?: T;
    pagination?: PaginationOldStatment;
}
export interface PaginationAnotherFile {
    currentPage?: number;
    itemsPerPage?: number;
    totalItems?: number;
    totalPages?: number;
}
export class PaginatedResultAnotherFile<T> {
    result?: T;
    pagination?: PaginationAnotherFile;
}
export interface PaginationSearchByCivilId {
    currentPage?: number;
    itemsPerPage?: number;
    totalItems?: number;
    totalPages?: number;
}
export class PaginatedResultSearchByCivilId<T> {
    result?: T;
    pagination?: PaginationSearchByCivilId;
}
export interface PaginationStatemnentSec {
    currentPage?: number;
    itemsPerPage?: number;
    totalItems?: number;
    totalPages?: number;
}
export class PaginatedResultStatemnentSec<T> {
    result?: T;
    pagination?: PaginationStatemnentSec;
}
export interface PaginationCustomers {
    currentPage?: number;
    itemsPerPage?: number;
    totalItems?: number;
    totalPages?: number;
}
export class PaginatedResultCustomers<T> {
    result?: T;
    pagination?: PaginationCustomers;
}
export interface PaginationAutoNumber {
    currentPage?: number;
    itemsPerPage?: number;
    totalItems?: number;
    totalPages?: number;
}
export class PaginatedResultAutoNumber<T> {
    result?: T;
    pagination?: PaginationCustomers;
}
export interface PaginationResom {
    currentPage?: number;
    itemsPerPage?: number;
    totalItems?: number;
    totalPages?: number;
}
export class PaginatedResultResom<T> {
    result?: T;
    pagination?: PaginationResom;
}
export interface SearchElections {
    name?: string;
    first?: string;
    second?: string;
    third?: string;
    four?: string;
    family?: string;
    civilID?: number;
    _internal?: number;
    phoneNumber?: string;
    Address?: string;
}
export class SearchElectionsResult<T> {
    result?: T;
    pagination?: SearchElections;
}

