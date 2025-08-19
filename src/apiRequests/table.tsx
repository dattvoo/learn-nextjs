import http from "@/lib/http"
import { CreateTableBodyType, TableListResType, TableResType, UpdateTableBodyType } from "@/schemaValidations/table.schema"

const prefix = '/tables'

export const tableAPIRequest = {
    getTableList: () => {
        return http.get<TableListResType>(prefix)
    },

    getDetailTable: (id: number) => {
        return http.get<TableResType>(`${prefix}/${id}`)
    },

    addTable: (body: CreateTableBodyType) => {
        return http.post<CreateTableBodyType>(`${prefix}`, body)
    },

    updateTable: (id: number, body: UpdateTableBodyType) => {
        return http.put<TableResType>(`${prefix}/${id}`, body)
    },

    deleteTable: (id: number) => {
        return http.delete<TableResType>(`${prefix}/${id}`)
    }
}