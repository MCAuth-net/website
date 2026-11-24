import { Account } from "@/app/lib/types";

export function getAccentColor(user: Account | null) {

    if (!user) return "3c8527";

    switch (user.color) {

        case "green":
            return "3c8527";

        case "blue":
            return "3c5ccc";

        case "teal":
            return "1f9c8f";

        case "violet":
            return "7a3cc8";

        case "pink":
            return "e05c9c";

        case "yellow":
            return "f0c020";

        case "red":
            return "c83030";

        case "grey":
            return "8a8a8a";

        default:
            return "3c8527";

    }

}

export function getColorName(color: string) {

    switch (color) {

        case "3c8527":
            return "green";

        case "3c5ccc":
            return "blue";

        case "1f9c8f":
            return "teal";

        case "7a3cc8":
            return "violet";

        case "e05c9c":
            return "pink";

        case "f0c020":
            return "yellow";

        case "c83030":
            return "red";

        case "8a8a8a":
            return "grey";

        default:
            return "green";

    }

}