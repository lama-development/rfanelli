export type MessageParameter<Message extends string> =
  Message extends `${string}{${infer Parameter}}${infer Rest}`
    ? Parameter | MessageParameter<Rest>
    : never

export type MessageValues<Message extends string, Value> = Record<
  MessageParameter<Message>,
  Value
>

/** Named placeholders keep complete sentences and word order in the locale. */
export function formatMessage<const Message extends string>(
  message: Message,
  values: MessageValues<Message, string | number>
): string {
  return message.replace(/\{(\w+)\}/g, (_, name: MessageParameter<Message>) => {
    if (!Object.hasOwn(values, name)) {
      throw new Error(`Missing localized message value: ${name}`)
    }
    return String(values[name])
  })
}
