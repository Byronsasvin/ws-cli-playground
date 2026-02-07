export const challenges = [
    {
        id: 1,
        title: "Mi Primer Bucket S3",
        difficulty: "beginner",
        category: "s3",
        description: "Crea tu primer contenedor de archivos en la nube.",
        objective: "Crea un bucket llamado 'mi-primer-bucket'",
        solution: "aws s3 mb s3://mi-primer-bucket",
        reward: 100,
    },
    {
        id: 2,
        title: "Listar Mis Buckets",
        difficulty: "beginner",
        category: "s3",
        description: "Verifica qué buckets tienes creados actualmente.",
        objective: "Lista todos tus buckets",
        solution: "aws s3 ls",
        reward: 50,
    }
];
