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
} from "@react-email/components";
import { FavIcon } from "../../lib/icons";
import * as React from "react";

export default function ThankYou() {
  return (
    <Html>
      <Tailwind>
        <Body className="h-svh w-svw bg-slate-100 px-[6px] py-[10px]">
          <Container className="h-full w-full rounded-lg border border-solid border-blue-950 bg-white px-[16px] py-[16px] drop-shadow-lg">
            <Section className="mb-[20px]">
              <Heading className="text-center text-2xl font-bold text-blue-950">
                Hi there, [Name]
              </Heading>
              <Hr />
              {/* <Img src="favicon-32x32.png" alt="logo" width={32} height={32} />
              <FavIcon /> */}
            </Section>
            <Section className="w-full text-left">
              <Text className="mb-[20px] text-xl font-medium text-blue-950">
                Note: This is a test email reply, for a Frontend Mentor
                challenge.
              </Text>
              <Text className="text-base font-normal text-slate-500">
                Please find a short summary of your form completion below:
              </Text>
            </Section>
            <Section className="rounded-lg bg-slate-100 px-[10px] py-[8px]">
              <Section className="w-full">
                <Row className="w-full">
                  <Column className="w-1/2 text-base text-blue-950">
                    Arcade (Monthly)
                  </Column>
                  <Column className="w-1/2 text-right text-base text-blue-950">
                    +$9/mo
                  </Column>
                </Row>
              </Section>

              <Hr />
              <Text className="text-sm text-slate-500">Online service</Text>
              <Text className="text-sm text-slate-500">Larger storage</Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
