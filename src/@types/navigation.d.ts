export type ProductNavigationProps = {
    id?: string;
}

export type OrderNavigationProps = {
    order: string;
}

export declare global {
    namespace ReactNavigation {
        interface RootParamList {
            home: undefined;
            product: ProductNavigationProps;
            order: OrderNavigationProps;
            orders: undefined;
        }
    }
}