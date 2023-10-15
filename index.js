import {
  ThermalPrinter,
  PrinterTypes,
  CharacterSet,
  BreakLine,
} from "node-thermal-printer";
import Fastify from "fastify";
import fastifyCors from "@fastify/cors";

const fastify = Fastify({
  logger: true,
});

fastify.register(fastifyCors, {
  origin: true,
  methods: ["POST"],
});

// Declare a route
fastify.get("/", async function handler(request, reply) {
  return;
});

fastify.post("/api/print", async function handler(request, reply) {
  const data = request.body;
  console.log(data);
  reply.send({ message: "Data received" });
  let printer = new ThermalPrinter({
    // type: PrinterTypes.EPSON,
    interface: "tcp://192.168.0.111",
  });

  printer.alignCenter();
  printer.println("Hello world");
  // await printer.printImage("./assets/olaii-logo-black.png");
  printer.cut();

  try {
    let execute = printer.execute();
    console.log("Print done!");
  } catch (error) {
    console.error("Print failed:", error);
  }
});

// Run the server!
try {
  await fastify.listen({ port: 3000 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
