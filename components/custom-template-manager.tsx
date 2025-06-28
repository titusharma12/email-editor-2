"use client"

import { useState } from "react"
import { Button } from "@nextui-org/react"
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react"
import { Input } from "@nextui-org/react"
import { Textarea } from "@nextui-org/react"
import { Select, SelectItem } from "@nextui-org/react"
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react"
import { Chip } from "@nextui-org/react"
import { TemplateVariablesGuide } from "@/components/template-variables-guide"
import { useTemplate } from "@/contexts/template-context"
import { Plus, Edit, Trash2, Copy } from "lucide-react"

export function CustomTemplateManager() {
  const { customTemplates, addCustomTemplate, updateCustomTemplate, deleteCustomTemplate, duplicateTemplate } =
    useTemplate()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [editingTemplate, setEditingTemplate] = useState<any>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "Custom",
    html: "",
    css: "",
  })

  const categories = ["Custom", "Newsletter", "Business", "Marketing", "Promotional", "Welcome", "Transactional"]

  const handleSubmit = () => {
    if (editingTemplate) {
      updateCustomTemplate(editingTemplate.id, formData)
    } else {
      addCustomTemplate(formData)
    }
    resetForm()
    onOpenChange()
  }

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      category: "Custom",
      html: "",
      css: "",
    })
    setEditingTemplate(null)
  }

  const handleEdit = (template: any) => {
    setEditingTemplate(template)
    setFormData({
      name: template.name,
      description: template.description,
      category: template.category,
      html: template.html,
      css: template.css,
    })
    onOpen()
  }

  const handleDelete = (templateId: string) => {
    if (confirm("Are you sure you want to delete this template?")) {
      deleteCustomTemplate(templateId)
    }
  }

  const handleDuplicate = (templateId: string) => {
    const newName = prompt("Enter a name for the duplicated template:")
    if (newName) {
      duplicateTemplate(templateId, newName)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Custom Templates</h2>
        <Button
          color="primary"
          onPress={() => {
            resetForm()
            onOpen()
          }}
          startContent={<Plus className="w-4 h-4" />}
        >
          Create Template
        </Button>
      </div>

      <TemplateVariablesGuide />

      <Table aria-label="Custom templates table">
        <TableHeader>
          <TableColumn>NAME</TableColumn>
          <TableColumn>CATEGORY</TableColumn>
          <TableColumn>DESCRIPTION</TableColumn>
          <TableColumn>CREATED</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        <TableBody emptyContent="No custom templates found. Create your first template!">
          {customTemplates.map((template) => (
            <TableRow key={template.id}>
              <TableCell>
                <div className="font-medium">{template.name}</div>
              </TableCell>
              <TableCell>
                <Chip size="sm" variant="flat" color="primary">
                  {template.category}
                </Chip>
              </TableCell>
              <TableCell>
                <div className="max-w-xs truncate">{template.description}</div>
              </TableCell>
              <TableCell>
                <div className="text-sm text-gray-500">{new Date(template.createdAt).toLocaleDateString()}</div>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button size="sm" variant="light" isIconOnly onPress={() => handleEdit(template)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="light" isIconOnly onPress={() => handleDuplicate(template.id)}>
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="light" color="danger" isIconOnly onPress={() => handleDelete(template.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="5xl" scrollBehavior="inside">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {editingTemplate ? "Edit Template" : "Create New Template"}
              </ModalHeader>
              <ModalBody>
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Template Name"
                      placeholder="Enter template name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      variant="bordered"
                      isRequired
                    />
                    <Select
                      label="Category"
                      placeholder="Select category"
                      selectedKeys={new Set([formData.category])}
                      onSelectionChange={(keys) => {
                        // `keys` is `"all"` | Set<Key>`
                        const selected = Array.from(keys as Set<string>)[0]
                        setFormData({ ...formData, category: selected })
                      }}
                      variant="bordered"
                    >
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>

                  <Textarea
                    label="Description"
                    placeholder="Describe your template"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    variant="bordered"
                    minRows={2}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <Textarea
                      label="HTML Content"
                      placeholder="Enter your HTML template here. Use variables like {{companyName}}, {{heading}}, etc."
                      value={formData.html}
                      onChange={(e) => setFormData({ ...formData, html: e.target.value })}
                      variant="bordered"
                      minRows={10}
                      classNames={{
                        input: "font-mono text-sm",
                      }}
                    />

                    <Textarea
                      label="CSS Styles"
                      placeholder="Enter your CSS styles here. You can also use variables in CSS."
                      value={formData.css}
                      onChange={(e) => setFormData({ ...formData, css: e.target.value })}
                      variant="bordered"
                      minRows={10}
                      classNames={{
                        input: "font-mono text-sm",
                      }}
                    />
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">💡 Template Tips:</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Use template variables like {`{{companyName}}`} to make your template dynamic</li>
                      <li>• Variables work in both HTML and CSS sections</li>
                      <li>• Test your template in the Preview tab after saving</li>
                      <li>• Use email-safe HTML and inline CSS for best compatibility</li>
                    </ul>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={handleSubmit} isDisabled={!formData.name || !formData.html}>
                  {editingTemplate ? "Update Template" : "Create Template"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}
