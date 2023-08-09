import { Button, IButtonProps } from "native-base";
import { ReactNode } from "react";

interface ButtonProps extends IButtonProps {
    children: ReactNode;
}

export function Botao({ children, ...rest }: ButtonProps) {
    return(
        <Button
            w='100%'
            bg='blue.800'
            mt={10}
            borderRadius='lg'
            {...rest}
        >
            {children}
        </Button>
    );
};