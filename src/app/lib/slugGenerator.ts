// utils/slugGenerator.ts
export const generateSlug = (title: string) => {
    return title
        .toLowerCase()
        .normalize('NFD') // Remove acentos
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9 -]/g, '') // Remove caracteres inválidos
        .replace(/\s+/g, '-') // Espaços para hífens
        .replace(/-+/g, '-') // Remove múltiplos hífens
        .trim()
}

export const generateUniqueSummary = (title: string, existingSlugs: string[]) => {
    let slug = generateSlug(title)
    let counter = 1

    while (existingSlugs.includes(slug)) {
        slug = `${slug}-${counter}`
        counter++
    }

    return slug
}

export const generateExcerpt = (body: string, length: number = 160): string => {
    return body
        .replace(/\\n/g, ' ') // Remove quebras de linha
        .replace(/<[^>]+>/g, '') // Remove HTML tags
        .substring(0, length)
        .trim() + '...';
};