import  {NextResponse, NextRequest} from 'next/server'
import {conn}  from '../../../config/db';

export async function POST(req){//obtener datos de una factura del mes que se debe pagar por gastos de la vivienda
    const{mes,codigoCasa} = await req.json(); 
    //consulta para el encabezado del recibo
    try {
        const[rows] =  await conn.query(`select RE.idReciboGastoEncabezado as CodigoEncabezado, CONCAT(p.nombre, ' ', p.apellido) as Nombres, M.nombreMes as Mes, EF.Estado as EstadoPago, V.codigo as CodVivienda, RE.fecha_recibo
        from ReciboGastoEncabezado RE
        inner join Mes M on M.Mesid = RE.Mes
        inner join EstadoFactura EF on  EF.id = RE.Estado
        inner join vivienda V on V.codigo = RE.idVivienda
        inner join propietarios p on p.idPropietario = V.idPropietario 
        WHERE M.Mesid = ? and V.codigo = ? and EF.id = ?;`,[mes,codigoCasa,2]); 
        let objetoEncbezadoRecibo = rows[0];
        if(objetoEncbezadoRecibo == undefined) return NextResponse.json({message:"no se encontraron registros con los parametros establecidos"});
        /*obteniendo el detalle del encabezado de gasto*/
        const detalle = await conn.query(`select S.descripcion, RD.cuota from ReciboGastoDetalle RD
        inner join Servicios S on S.idServicio = RD.idServicio 
        where RD.idReciboGastoEncabezado = ?`,[objetoEncbezadoRecibo.CodigoEncabezado]); 
        if(detalle[0].length == 0) return NextResponse.json({message:"no se encontraron registros con los parametros establecidos"});
        /*obteniendo el total calculado xd de ese recibo*/
        const total = await conn.query(`SELECT SUM(RD.cuota) AS Total FROM ReciboGastoDetalle RD 
        inner join ReciboGastoEncabezado RE on RE.idReciboGastoEncabezado = RD.idReciboGastoEncabezado
        WHERE MONTH(RE.fecha_recibo) = ? and RE.idVivienda = ? `,[9,'10-45']); 
        if(total[0].length == 0) return NextResponse.json({message:"no se encontraron registros con los parametros establecidos"});
        let finTotal = total[0]
        let elmeroTotal = finTotal[0]; 

       return NextResponse.json({
        encabezado: objetoEncbezadoRecibo,
        detalles: detalle[0],
        pagar: elmeroTotal
       }); 
    } catch (error) {
       return  NextResponse.json(error);
    }
  
}
