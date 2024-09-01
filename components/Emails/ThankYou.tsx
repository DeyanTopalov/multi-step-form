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
import * as React from "react";

export default function ThankYou() {
  return (
    <Html>
      <Tailwind>
        <Body className="h-svh w-svw bg-slate-100 px-[6px] py-[10px]">
          <Container className="h-full w-full rounded-lg bg-white px-[16px] py-[16px] drop-shadow-lg">
            <Section className="mb-[20px]">
              {/* add the image from the local files */}
              <Img
                // src="https://avatars.githubusercontent.com/u/47932038?s=280&v=4"
                src="https://cdn.brandfetch.io/id-7PJzcYu/w/240/h/240/theme/dark/icon.jpeg?k=id64Mup7ac&t=1724851273951?t=1724851273951"
                alt="logo"
                width="32"
                height="32"
              />
              <Img src="favicon-frm.png" alt="logo2" width="32" height="32" />
              <Heading className="text-center text-2xl font-bold text-blue-950">
                Hi there, [Name]
              </Heading>
              <Hr />
            </Section>
            <Section className="w-full text-left">
              <Text className="mb-[20px] text-xl font-medium text-blue-950">
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
                    Arcade (Monthly)
                  </Column>
                  <Column className="w-1/2 text-right text-base text-blue-950">
                    $9/mo
                  </Column>
                </Row>
              </Section>
              <Hr />
              <Section className="w-full">
                <Row className="mb-[6px] w-full">
                  <Column className="w-1/2 text-sm text-slate-500">
                    Online service
                  </Column>
                  <Column className="w-1/2 text-right text-sm text-slate-500">
                    +$1/mo
                  </Column>
                </Row>

                <Row className="mb-[6px] w-full">
                  <Column className="w-1/2 text-sm text-slate-500">
                    Larger storage
                  </Column>
                  <Column className="w-1/2 text-right text-sm text-slate-500">
                    +$2/mo
                  </Column>
                </Row>
              </Section>
            </Section>
            <Row className="mb-[6px] w-full px-[10px]">
              <Column className="w-1/2 text-sm text-slate-500">
                Total (per month)
              </Column>
              <Column className="w-1/2 text-right text-base font-bold text-blue-800">
                $12/mo
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
