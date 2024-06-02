import { ILocation } from "@/models/table";

export const PathLocation = (arg: ILocation, edit?: string) => {
    let pathLocation = arg.pathname.slice(1);
    if (edit) {
        const lastIndex = pathLocation.lastIndexOf("/");
        pathLocation = lastIndex !== -1 ? pathLocation.substring(0, lastIndex) : pathLocation;
        pathLocation = pathLocation.replace("edit", `${edit}`).replace(/\//g, " > ").replace(/\b\w/g, (item: string) =>item);
    }
    else {
        pathLocation = pathLocation.replace(/\//g, " > ").replace(/-/g, ">").replace(/\b\w/g, (item: string) => item);
    }
    return pathLocation
}
