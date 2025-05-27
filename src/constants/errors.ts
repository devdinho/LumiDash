export class ApiError {
    static readonly INVALID_CREDENTIALS = 'No active account found with the given credentials';

    static readonly ERROR_CHOICES =[
        {value: ApiError.INVALID_CREDENTIALS, label: 'Nenhuma conta ativa encontrada com as credenciais fornecidas'},
    ]
}