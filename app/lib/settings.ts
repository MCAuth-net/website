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