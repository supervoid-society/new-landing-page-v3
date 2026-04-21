// app/components/ui/editor.tsx
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import { useEffect } from "react";

export default function Editor({
  value,
  onChange,
}: {
  value: string;
  onChange: (html: string) => void;
}) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
        code: { HTMLAttributes: { class: "inline-code" } },
      }),
      Underline,
      Placeholder.configure({
        placeholder: "Tell your story…",
        emptyEditorClass: "is-editor-empty",
      }),
    ],
    content: value || "",
    editorProps: {
      attributes: {
        class:
          "focus:outline-none w-full max-w- mx-auto min-h- py-10 text- leading-[1.8] text-zinc-100",
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  useEffect(() => {
    if (editor && value!== editor.getHTML()) {
      editor.commands.setContent(value); // <-- sudah tanpa false
    }
  }, [value, editor]);

  return (
    <div className="w-full border-t border-zinc-800 mt-6">
      <style>{`
        .ProseMirror h1 { font-size: 2.5rem; font-weight: 800; line-height: 1.2; margin: 2.2rem 0 1rem; color: white; }
        .ProseMirror h2 { font-size: 1.875rem; font-weight: 700; line-height: 1.3; margin: 1.8rem 0 0.8rem; color: #e4e4e7; } /* zinc-200 */
        .ProseMirror h3 { font-size: 1.5rem; font-weight: 600; line-height: 1.4; margin: 1.5rem 0 0.6rem; color: #d4d4d8; } /* zinc-300 */
        .ProseMirror strong { font-weight: 800; color: white; }
        .ProseMirror em { font-style: italic; color: #a1a1aa; }
        .ProseMirror u { text-decoration: underline; text-underline-offset: 4px; }
      `}</style>
      <EditorContent editor={editor} />
    </div>
  );
}