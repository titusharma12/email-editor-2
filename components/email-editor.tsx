"use client"

import React, { useState } from "react"
import { Card, CardBody, CardHeader } from "@nextui-org/react"
import { Input } from "@nextui-org/react"
import { Textarea } from "@nextui-org/react"
import { Select, SelectItem } from "@nextui-org/react"
import { Tabs, Tab } from "@nextui-org/react"
import { useTemplate } from "@/contexts/template-context"
import { GrapesEditor } from "@/components/grapes-editor"
import { TemplatePreview } from "@/components/template-preview"
import { CustomTemplateManager } from "@/components/custom-template-manager"
import { Eye, Settings, Code, Palette, Building, Globe, Plus } from "lucide-react"

export function EmailEditor() {
  const { templateData, updateTemplateData, currentTemplate, setCurrentTemplate, templates } = useTemplate()
  const [activeTab, setActiveTab] = useState("editor")

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold text-gray-900">Email Template Editor</h1>
          <p className="text-sm text-gray-600 mt-1">Design beautiful email templates with centralized data</p>
        </div>

        <div className="p-4 space-y-6">
          {/* Template Selector */}
          <Card>
            <CardHeader className="pb-2">
              <h3 className="text-sm font-semibold">Template Layout</h3>
            </CardHeader>
            <CardBody className="pt-0">
              <Select
                selectedKeys={[currentTemplate]}
                onSelectionChange={(keys) => {
                  const selected = Array.from(keys)[0] as string
                  setCurrentTemplate(selected)
                }}
                placeholder="Select Email template"
               
                className="w-full !text-black"
              >
                {templates.map((template:any) => (
                  <SelectItem key={template.id} value={template.id}>
                    <div className="flex flex-col">
                      <span className="font-medium">{template.name}</span>
                      <span className="text-xs text-gray-500">{template.description}</span>
                    </div>
                  </SelectItem>
                ))}
              </Select>
              <p className="text-xs text-gray-500 mt-2">
                All templates use the same data - change layout without losing content
              </p>
            </CardBody>
          </Card>

          {/* Company Settings */}
          <Card>
            <CardHeader className="pb-2">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <Building className="w-4 h-4" />
                Company Information
              </h3>
            </CardHeader>
            <CardBody className="pt-0 space-y-4">
              <Input
                label="Company Name"
                value={templateData.companyName}
                onChange={(e) => updateTemplateData({ companyName: e.target.value })}
                placeholder="Your Company Name"
                variant="bordered"
              />

              <Input
                label="Company Logo URL"
                value={templateData.companyLogo}
                onChange={(e) => updateTemplateData({ companyLogo: e.target.value })}
                placeholder="https://example.com/logo.png"
                variant="bordered"
              />
            </CardBody>
          </Card>

          {/* Content Settings */}
          <Card>
            <CardHeader className="pb-2">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Content Settings
              </h3>
            </CardHeader>
            <CardBody className="pt-0 space-y-4">
              <Input
                label="Main Heading"
                value={templateData.heading}
                onChange={(e) => updateTemplateData({ heading: e.target.value })}
                placeholder="Welcome to Our Newsletter"
                variant="bordered"
              />

              <Input
                label="Subheading"
                value={templateData.subheading}
                onChange={(e) => updateTemplateData({ subheading: e.target.value })}
                placeholder="Stay updated with our latest news"
                variant="bordered"
              />

              <Textarea
                label="Main Content"
                value={templateData.content.mainText}
                onChange={(e) =>
                  updateTemplateData({
                    content: { ...templateData.content, mainText: e.target.value },
                  })
                }
                placeholder="Your main email content..."
                variant="bordered"
                minRows={3}
              />

              <Input
                label="Button Text"
                value={templateData.buttonText}
                onChange={(e) => updateTemplateData({ buttonText: e.target.value })}
                placeholder="Get Started Today"
                variant="bordered"
              />

              <Input
                label="Button URL"
                value={templateData.buttonUrl}
                onChange={(e) => updateTemplateData({ buttonUrl: e.target.value })}
                placeholder="https://example.com"
                variant="bordered"
              />
            </CardBody>
          </Card>

          {/* Color Settings */}
          <Card>
            <CardHeader className="pb-2">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <Palette className="w-4 h-4" />
                Brand Colors
              </h3>
            </CardHeader>
            <CardBody className="pt-0 space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Primary Color</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={templateData.primaryColor}
                    onChange={(e) => updateTemplateData({ primaryColor: e.target.value })}
                    className="w-16 h-10 rounded-lg border-2 border-gray-200"
                  />
                  <Input
                    value={templateData.primaryColor}
                    onChange={(e) => updateTemplateData({ primaryColor: e.target.value })}
                    placeholder="#007cba"
                    variant="bordered"
                    className="flex-1"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Secondary Color</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={templateData.secondaryColor}
                    onChange={(e) => updateTemplateData({ secondaryColor: e.target.value })}
                    className="w-16 h-10 rounded-lg border-2 border-gray-200"
                  />
                  <Input
                    value={templateData.secondaryColor}
                    onChange={(e) => updateTemplateData({ secondaryColor: e.target.value })}
                    placeholder="#333333"
                    variant="bordered"
                    className="flex-1"
                  />
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Social Links */}
          <Card>
            <CardHeader className="pb-2">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Social Media Links
              </h3>
            </CardHeader>
            <CardBody className="pt-0 space-y-3">
              <Input
                label="Facebook"
                value={templateData.socialLinks.facebook}
                onChange={(e) =>
                  updateTemplateData({
                    socialLinks: { ...templateData.socialLinks, facebook: e.target.value },
                  })
                }
                placeholder="https://facebook.com/yourcompany"
                variant="bordered"
              />
              <Input
                label="Twitter"
                value={templateData.socialLinks.twitter}
                onChange={(e) =>
                  updateTemplateData({
                    socialLinks: { ...templateData.socialLinks, twitter: e.target.value },
                  })
                }
                placeholder="https://twitter.com/yourcompany"
                variant="bordered"
              />
              <Input
                label="Instagram"
                value={templateData.socialLinks.instagram}
                onChange={(e) =>
                  updateTemplateData({
                    socialLinks: { ...templateData.socialLinks, instagram: e.target.value },
                  })
                }
                placeholder="https://instagram.com/yourcompany"
                variant="bordered"
              />
              <Input
                label="LinkedIn"
                value={templateData.socialLinks.linkedin}
                onChange={(e) =>
                  updateTemplateData({
                    socialLinks: { ...templateData.socialLinks, linkedin: e.target.value },
                  })
                }
                placeholder="https://linkedin.com/company/yourcompany"
                variant="bordered"
              />
            </CardBody>
          </Card>

          {/* Footer Settings */}
          <Card>
            <CardHeader className="pb-2">
              <h3 className="text-sm font-semibold">Footer</h3>
            </CardHeader>
            <CardBody className="pt-0">
              <Textarea
                label="Footer Text"
                value={templateData.footerText}
                onChange={(e) => updateTemplateData({ footerText: e.target.value })}
                placeholder="© 2024 Your Company. All rights reserved."
                variant="bordered"
                minRows={3}
              />
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Tabs
          selectedKey={activeTab}
          onSelectionChange={(key) => setActiveTab(key as string)}
          className="flex flex-col"
          classNames={{
            base: " flex flex-col",
            tabList: "w-full",
            panel: "flex-1 overflow-hidden",
          }}
        >
          <Tab
            key="editor"
            title={
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4" />
                Editor
              </div>
            }
          >
            <GrapesEditor />
          </Tab>
          <Tab
            key="preview"
            title={
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Preview
              </div>
            }
          >
            <div className="h-full overflow-y-auto p-4">
              <TemplatePreview />
            </div>
          </Tab>
          <Tab
            key="custom"
            title={
              <div className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Custom Templates
              </div>
            }
          >
            <div className="h-full overflow-y-auto p-6">
              <CustomTemplateManager />
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  )
}
