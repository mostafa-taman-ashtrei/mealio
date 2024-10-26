import { Menu, QrCode, UrlViews } from "@prisma/client";

export type ViewWithQrCode = UrlViews & {
    qrCode: QrCode & {
        menu: Menu
    }
}