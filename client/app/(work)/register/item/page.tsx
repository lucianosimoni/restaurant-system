import { Button } from "@nextui-org/react";
import Link from "next/link";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/react";

export default function MainItem() {
  const items = [
    {
      id: 23,
      code: "0022",
      title: "Marmita do Buffet",
      category: "Marmitas",
      description: "Com carnes do Buffet",
      imageURL: "www.google.com",
      price: 18,
      cost: 13,
      type: "00",
      unitSystem: "UN",
    },
  ];

  return (
    <main>
      <Button as={Link} href="/" color="primary">
        Inicio
      </Button>

      <Table>
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>CODIGO</TableColumn>
          <TableColumn>TITULO</TableColumn>
          <TableColumn>CATEGORIA</TableColumn>
          <TableColumn>DESCRÇÃO</TableColumn>
          <TableColumn>PREÇO</TableColumn>
          <TableColumn>CUSTO</TableColumn>
          <TableColumn>TIPO DE ITEM</TableColumn>
          <TableColumn>TIPO DE UN</TableColumn>
        </TableHeader>
        <TableBody>
          {items.map((item, index) => {
            return (
              <TableRow key={index}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.code}</TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>{item.cost}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.unitSystem}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </main>
  );
}
