// pages/CalendarPage.tsx
import { Layout, Card, Segmented, Space, Button, Input, Badge, Tag, List, Tooltip } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/he";
import { useMemo } from "react";
dayjs.locale("he");

type Status = "done" | "in-progress" | "todo";
type CalEvent = { id: string; title: string; date: string; time?: string; status: Status; note?: string };

const statusTag: Record<Status, { text: string; color: string }> = {
  done: { text: "בוצע", color: "green" },
  "in-progress": { text: "בתהליך", color: "blue" },
  todo: { text: "טרם בוצע", color: "default" },
};

const mockEvents: CalEvent[] = [
  { id: "1", title: "תחילת שנת הלימודים", date: "2025-12-10", status: "in-progress", time: "07:00" },
  { id: "2", title: "שיחת מפקד", date: "2025-12-12", status: "done", time: "12:30" },
  { id: "3", title: "מסדר בוקר", date: "2025-12-12", status: "todo", time: "07:00" },
  { id: "4", title: "למידה עצמית", date: "2025-12-11", status: "in-progress", time: "09:00" },
];

export default function CalendarPage() {
  const today = dayjs();
  const monthStart = today.startOf("month");
  const monthDays = useMemo(() => {
    const days: Dayjs[] = [];
    const start = monthStart.startOf("week");
    const end = monthStart.endOf("month").endOf("week");
    let cur = start;
    while (cur.isBefore(end) || cur.isSame(end, "day")) {
      days.push(cur);
      cur = cur.add(1, "day");
    }
    return days;
  }, [monthStart]);

  const getEventsFor = (d: Dayjs) =>
    mockEvents.filter(e => dayjs(e.date).isSame(d, "day"));

  return (
    <Layout style={{ direction: "rtl", minHeight: "100vh" }}>
      {/* לוח + צד ימין של התראות */}
      <Layout.Content style={{ padding: 16 }}>
        <Space direction="vertical" size={16} style={{ width: "100%" }}>

          {/* סרגל עליון כמו בפיגמה */}
          <Card bodyStyle={{ padding: 12 }}>
            <div style={{ display: "flex", gap: 12, alignItems: "center", justifyContent: "space-between" }}>
              <Space wrap>
                <Segmented options={["חודש", "שבועיים", "שבוע", "יום"]} defaultValue="חודש" />
                <Segmented options={["סטטוס", "משימות"]} defaultValue="סטטוס" />
                <Input placeholder="חיפוש" style={{ width: 220 }} />
              </Space>
              <Space>
                <Button>היום</Button>
                <Button>‹</Button>
                <div style={{ fontWeight: 600 }}>{today.format("MMMM YYYY")}</div>
                <Button>›</Button>
                <Button type="primary" icon={<PlusOutlined />}>אירוע חדש</Button>
              </Space>
            </div>
          </Card>

          <div>
       
            <Card bodyStyle={{ padding: 12 }}>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(7, 1fr)",
                  gap: 8,
                  fontWeight: 600,
                  color: "#666",
                  padding: "0 4px 8px",
                }}
              >
                {["א׳","ב׳","ג׳","ד׳","ה׳","ו׳","ש׳"].map(d => <div key={d} style={{ textAlign: "center" }}>{d}</div>)}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 8 }}>
                {monthDays.map(d => {
                  const dayEvents = getEventsFor(d);
                  const isOtherMonth = d.month() !== monthStart.month();
                  const isToday = d.isSame(today, "day");
                  return (
                    <div
                      key={d.toString()}
                      style={{
                        border: "1px solid #f0f0f0",
                        borderRadius: 8,
                        minHeight: 140,
                        background: isOtherMonth ? "#fafafa" : "#fff",
                        position: "relative",
                        padding: 8,
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontWeight: 600, color: isOtherMonth ? "#bbb" : "#555" }}>
                          {d.date()}
                        </span>
                        {isToday && <Badge color="blue" text="היום" />}
                      </div>

                      <div style={{ marginTop: 8, display: "grid", gap: 6 }}>
                        {dayEvents.slice(0, 3).map(ev => (
                          <Tooltip key={ev.id} title={ev.note || ev.title}>
                            <div
                              style={{
                                borderRadius: 8,
                                padding: "6px 8px",
                                border: "1px solid #eaeaea",
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              <span style={{ color: "#999", fontSize: 12 }}>{ev.time}</span>
                              <span style={{ fontWeight: 600 }}>{ev.title}</span>
                              <Tag style={{ marginInlineStart: "auto" }} color={statusTag[ev.status].color}>
                                {statusTag[ev.status].text}
                              </Tag>
                            </div>
                          </Tooltip>
                        ))}
                        {dayEvents.length > 3 && (
                          <Button size="small" type="link">+ עוד {dayEvents.length - 3}</Button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        </Space>
      </Layout.Content>
    </Layout>
  );
}
