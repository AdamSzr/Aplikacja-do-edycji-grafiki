

export default function copyFile(file: File) {
    return new File([file], file.name)
}


