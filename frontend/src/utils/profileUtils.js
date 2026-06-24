
export function formatarNome(name) {
    const nomeFormatado = name.trim().split(/\s+/);

    if (nomeFormatado.length <= 1) {
        return nomeFormatado[0];
    }

    return `${nomeFormatado[0]} ${nomeFormatado[nomeFormatado.length - 1]}`;
}