import {
  Tailwind,
  Html,
  Body,
  Container,
  Section,
  Img,
  Heading,
  Text,
  Hr,
  Row,
  Column,
  Button,
  Head,
  Preview,
} from "@react-email/components";
import * as React from "react";
import { TFormSchema } from "@lib/schema";
import { getPriceTag, formatCurrency, sum } from "@lib/utils";

type EmailProps = Pick<
  TFormSchema,
  "name" | "billingPlan" | "billingCycle" | "selectedAddons"
>;

//default values for testing
// const defaultValues: TFormSchema = {
//   name: "John Doe",
//   email: "john.doe@example.com",
//   phoneNumber: "+1234567890",
//   billingPlan: { name: "Arcade", price: 9 },
//   billingCycle: "monthly",
//   selectedAddons: [
//     { title: "Online service", price: 1 },
//     { title: "Larger storage", price: 2 },
//   ],
// };

export default function ThankYou({
  name,
  billingPlan,
  billingCycle,
  selectedAddons,
}: EmailProps) {
  //default values for testing
  // export default function ThankYou(props: EmailProps) {
  //   // Merge default props with provided props
  //   const { name, billingPlan, billingCycle, selectedAddons } = {
  //     ...defaultValues,
  //     ...props,
  //   };

  const priceTag = getPriceTag(billingCycle);

  return (
    <Html>
      <Head />
      <Preview>Hi there, {name}</Preview>
      <Tailwind>
        <Body className="mx-auto h-svh w-svw bg-slate-100 px-[6px]">
          <Container className="h-full w-full rounded-lg bg-white px-[16px] py-[16px] drop-shadow-lg">
            <Section className="mb-[20px]">
              {/* add the image from the local files */}
              <Img
                // src="https://avatars.githubusercontent.com/u/47932038?s=280&v=4"
                src="https://cdn.brandfetch.io/id-7PJzcYu/w/240/h/240/theme/dark/icon.jpeg?k=id64Mup7ac&t=1724851273951?t=1724851273951"
                alt="logo"
                width="32"
                height="32"
                className="rounded-full"
              />
              {/* <ExternalLink /> */}
              {/* <Img src="favicon-frm.png" alt="logo2" width="32" height="32" /> */}
              <Heading className="text-center text-xl font-bold text-blue-950">
                Hi there, {name}
              </Heading>
              <Hr />
            </Section>
            <Section className="w-full text-left">
              <Text className="mb-[20px] text-lg font-medium text-blue-950">
                Note: This is a test email reply for a Frontend Mentor
                challenge.
              </Text>
              <Text className="text-base font-normal text-slate-500">
                Please find a short summary of your form completion below:
              </Text>
            </Section>
            <Section className="mb-[16px] rounded-lg bg-slate-100 px-[10px] py-[8px]">
              <Section className="w-full">
                <Row className="w-full">
                  <Column className="w-1/2 text-base text-blue-950">
                    {billingPlan.name} ({billingCycle})
                  </Column>
                  <Column className="w-1/2 text-right text-base text-blue-950">
                    {formatCurrency(billingPlan.price) + priceTag}
                  </Column>
                </Row>
              </Section>
              <Hr />
              <Section className="w-full">
                {selectedAddons?.map((addon) => (
                  <Row className="mb-[6px] w-full" key={addon.title}>
                    <Column className="w-1/2 text-sm text-slate-500">
                      {addon.title}
                    </Column>
                    <Column className="w-1/2 text-right text-sm text-slate-500">
                      {"+" + formatCurrency(addon.price) + priceTag}
                    </Column>
                  </Row>
                ))}
              </Section>
            </Section>
            <Row className="mb-[6px] w-full px-[10px]">
              <Column className="w-1/2 text-sm text-slate-500">
                {billingCycle === "monthly"
                  ? "Total (per month)"
                  : "Total (per year)"}
              </Column>
              <Column className="w-1/2 text-right text-base font-bold text-blue-800">
                {formatCurrency(
                  sum(
                    billingPlan.price,
                    ...(selectedAddons?.map((addon) => addon.price) || []),
                  ),
                ) + priceTag}
              </Column>
            </Row>
            <Row className="mt-[20px] w-full">
              <Column align="center">
                <Button
                  className="m-auto cursor-pointer rounded-lg bg-blue-950 px-4 py-2 text-white"
                  href="https://www.frontendmentor.io/challenges/multistep-form-YVAnSdqQBJ"
                >
                  Visit challenge
                </Button>
              </Column>
            </Row>
            <Section className="mt-[40px]">
              <Text className="text-base font-normal text-slate-500">
                Thank you for your time & Happy coding!
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
