import { Fragment, type ReactNode } from "react"
import type { MessageParameter, MessageValues } from "@/i18n/format"

/** Render rich messages as React nodes; translations never contain HTML. */
export function LocalizedText<const Message extends string>({
  message,
  values,
}: {
  message: Message
  values: MessageValues<Message, ReactNode>
}) {
  return message.split(/(\{\w+\})/g).map((part, index) => {
    if (!/^\{\w+\}$/.test(part)) return part
    const name = part.slice(1, -1) as MessageParameter<Message>
    if (!Object.hasOwn(values, name)) {
      throw new Error(`Missing localized message value: ${name}`)
    }
    return <Fragment key={index}>{values[name]}</Fragment>
  })
}
